import { EOL } from 'os';
import * as yup from 'yup';
import MarkdownIt from 'markdown-it';

yup.addMethod(yup.MixedSchema, "oneOfSchemas", function (schemas: yup.AnySchema[]) {
    return this.test(
        "one-of-schemas",
        "Not all items in '${path}' match one of the allowed schemas",
        (item) =>
            schemas.some((schema) => schema.isValidSync(item, { strict: true }))
    );
});

const nodeWithTitleAndPropertiesSchema = yup.object({
    title: yup.string().optional(),
    type: yup.string().oneOf(['object', 'string']),
    properties: yup.object({}),
});

const oneOfSchema = yup.array().of(yup.object({
    '$ref': yup.string().required()
})).optional();

const itemsSchema = yup.mixed().oneOfSchemas([nodeWithTitleAndPropertiesSchema, yup.object({ '$ref': yup.string().optional() })]).optional();

const anyOfSchema = yup.array().of(yup.mixed().oneOfSchemas([
    nodeWithTitleAndPropertiesSchema,
    yup.object({ '$ref': yup.string().required() })
])).optional()

const propertySchema = yup.object({
    type: yup.mixed().oneOfSchemas([
        yup.string(),
        yup.array().of(yup.string())
    ]),
    description: yup.string().optional(),
    enum: yup.array().of(yup.mixed().oneOfSchemas([
        yup.string(),
        yup.array().of(yup.number()),
        yup.array().of(yup.string())
    ])).optional(),
    oneOf: oneOfSchema,
    anyOf: anyOfSchema,
    items: itemsSchema,
    '$ref': yup.string().optional()
});

interface Items extends yup.InferType<typeof itemsSchema> { }
interface AnyOf extends yup.InferType<typeof anyOfSchema> { }
interface OneOf extends yup.InferType<typeof oneOfSchema> { }

export type Properties = Record<string, Property>
type Property = { description?: string, example?: string, type?: string }

const md = new MarkdownIt({ breaks: true, html: true })
const renderMarkdown = markdown => md.render(`${markdown}`).replace(/\n|\r/g, "")

export enum RenderMode {
    Nested,
    List
}
export enum ExamplesRenderedAs {
    Column,
    PartOfDescription
}

export default class SchemaToMarkdownTable {
    constructor(private schemas: object, private redenderMode: RenderMode = RenderMode.List, private examplesRenderedAs = ExamplesRenderedAs.Column) {
        if (!schemas) {
            throw new Error('Schemas must be provided')
        }
        if (typeof schemas !== 'object') {
            throw new Error('Schemas must be the object from openAPI file components.schemas attribute')
        }
    }

    private getMarkdownTableHead() {
        if (ExamplesRenderedAs.Column) {
            return [
                '| Attributes |  Description  | Example |',
                '|:-----|:--------|------:|'
            ].join(EOL)
        }
        return [
            '| Attributes |  Description |',
            '|:-----|:--------|'
        ].join(EOL)
    }

    private getMarkdownTableRow(columns: string[]) {
        return `| ${columns.join(' | ')} |`;
    }

    private getMarkdownLinkToHeader(label: string) {
        return `[${label}](#${label.toLocaleLowerCase().replace(/[\s]/g, "-").replace(/[,]/g, "")})`
    }

    private renderOneOfDescription(oneOf: OneOf, level: number) {
        const descriptionArr = [];
        const relatedObjectsNames = [];
        descriptionArr.push(`One of:`);
        const nestedObjectsHtml = oneOf.map(item => {
            const nestedObjectName = item['$ref'].replace('#/components/schemas/', '');
            if (typeof this.schemas[nestedObjectName] !== 'object') {
                return false
            }

            relatedObjectsNames.push(nestedObjectName)
            const title = (this.schemas[nestedObjectName].title || nestedObjectName) as string
            if (this.redenderMode === RenderMode.List) {
                return this.getMarkdownLinkToHeader(title)
            } else {
                const { html } = this.renderSchema(nestedObjectName, level + 1)
                return renderMarkdown(html)
            }

        }).filter(i => !!i)
        descriptionArr.push(nestedObjectsHtml.join(this.redenderMode === RenderMode.List ? ', ' : ''));

        return { descriptionArr, relatedObjectsNames }
    }

    private renderAnyOfDescription(anyOf: AnyOf, level: number) {
        const descriptionArr = [];
        const relatedObjectsNames = [];
        descriptionArr.push(`Any of:`)
        const nestedObjectsHtml = anyOf.map(item => {
            if ('$ref' in item && typeof item['$ref'] === 'string' && item['$ref'].startsWith('#/components/schemas/')) {
                const nestedObjectName = item['$ref'].replace('#/components/schemas/', '');
                if (typeof this.schemas[nestedObjectName] !== 'object') {
                    return false
                }
                relatedObjectsNames.push(nestedObjectName)
                const title = (this.schemas[nestedObjectName].title || nestedObjectName) as string
                if (this.redenderMode === RenderMode.List) {
                    return this.getMarkdownLinkToHeader(title)
                } else {
                    const { html } = this.renderSchema(nestedObjectName, level + 1)
                    return renderMarkdown(html)
                }
            } else if ('properties' in item) {
                const { html, relatedObjects } = this.renderSchema(item, level + 1)
                relatedObjectsNames.push(...relatedObjects)
                return renderMarkdown(html)
            }
        }).filter(i => !!i)
        descriptionArr.push(nestedObjectsHtml.join(this.redenderMode === RenderMode.List ? ', ' : ''))
        return { descriptionArr, relatedObjectsNames }
    }

    private renderItemsDescription(items: Items, level: number) {
        const descriptionArr = [];
        const relatedObjectsNames = [];

        if ('$ref' in items && typeof items['$ref'] === 'string' && items['$ref'].startsWith('#/components/schemas/')) {
            const nestedObjectName = items['$ref'].replace('#/components/schemas/', '');
            relatedObjectsNames.push(nestedObjectName)
            const title = (this.schemas[nestedObjectName].title || nestedObjectName) as string
            if (this.redenderMode === RenderMode.List) {
                descriptionArr.push(`Array of ${this.getMarkdownLinkToHeader(title)}`)
            } else {
                descriptionArr.push('Array of:')
                const { html } = this.renderSchema(nestedObjectName, level + 1)
                descriptionArr.push(renderMarkdown(html))
            }
        } else if ('type' in items && items.type === 'object') {
            descriptionArr.push('Array of:')
            const { html, relatedObjects } = this.renderSchema(items, level + 1)
            relatedObjectsNames.push(...relatedObjects)
            descriptionArr.push(renderMarkdown(html))
        }
        return { descriptionArr, relatedObjectsNames }
    }

    private renderRef(ref: string, level: number) {
        const descriptionArr = [];
        const relatedObjectsNames = [];
        if (ref.startsWith('#/components/schemas/')) {
            const nestedObjectName = ref.replace('#/components/schemas/', '');
            relatedObjectsNames.push(nestedObjectName)
            const title = (this.schemas[nestedObjectName].title || nestedObjectName) as string
            if (this.redenderMode === RenderMode.List) {
                descriptionArr.push(`See: ${this.getMarkdownLinkToHeader(title)}`)
            } else {
                const { html } = this.renderSchema(nestedObjectName, level + 1)
                descriptionArr.push(renderMarkdown(html))
            }
        }
        return { descriptionArr, relatedObjectsNames }
    }

    private renderProperty = (property: Property, level: number) => {
        const descriptionArr = [];
        const relatedObjectsNames = [];
        const example = "example" in property ? renderMarkdown(property.example) : '';

        const { description, enum: EnumProp, oneOf, anyOf, items, type, $ref } = propertySchema.validateSync(property)

        if (description) {
            descriptionArr.push(renderMarkdown(description))
        }

        if (EnumProp) {
            const availableValues = `Available values: ${EnumProp.map(value => `\`${value}\``).join(', ')}`;
            descriptionArr.push(availableValues)
        }

        if (oneOf) {
            const { descriptionArr: descriptionArrOneOf, relatedObjectsNames: relatedObjectsNamesOneOff } = this.renderOneOfDescription(oneOf, level);
            descriptionArr.push(...descriptionArrOneOf);
            relatedObjectsNames.push(...relatedObjectsNamesOneOff)
        }

        if (anyOf) {
            const { descriptionArr: descriptionArrAnyOf, relatedObjectsNames: relatedObjectsNamesAnyOff } = this.renderAnyOfDescription(anyOf, level);
            descriptionArr.push(...descriptionArrAnyOf);
            relatedObjectsNames.push(...relatedObjectsNamesAnyOff)
        }


        if (items) {
            const { descriptionArr: descriptionArrItems, relatedObjectsNames: relatedObjectsNamesItems } = this.renderItemsDescription(items, level);
            descriptionArr.push(...descriptionArrItems);
            relatedObjectsNames.push(...relatedObjectsNamesItems)
        }

        if ($ref) {
            const { descriptionArr: descriptionArrItems, relatedObjectsNames: relatedObjectsNamesItems } = this.renderRef($ref, level);
            descriptionArr.push(...descriptionArrItems);
            relatedObjectsNames.push(...relatedObjectsNamesItems)
        }

        if (type === 'object') {
            const { html, relatedObjects } = this.renderSchema(property, level + 1)
            relatedObjectsNames.push(...relatedObjects)
            descriptionArr.push(renderMarkdown(html))
        }


        return { descriptionArr, relatedObjectsNames, example }
    }

    private renderPropertiesAsTableRow = (properties: Properties, level: number = 0) => {
        const relatedObjectsNames: string[] = [];

        const tableRows = Object.entries(properties).map(([propertyId, property]) => {
            // console.log(`rendering propertyId: ${propertyId} for level ${level}`)

            const { descriptionArr, relatedObjectsNames: additionalRelatedObjectsNames, example } = this.renderProperty(property, level)

            relatedObjectsNames.push(...additionalRelatedObjectsNames);

            const propertyLabel = [
                propertyId,
                property.type? `\`${property.type}\`` : false  
            ].filter(e => !!e)
            .join('</br>');

            if (this.examplesRenderedAs == ExamplesRenderedAs.Column) {

                return this.getMarkdownTableRow([propertyLabel, descriptionArr.join(' '), example]);
            } else {
                if (example) {
                    descriptionArr.push('**Example:**')
                    descriptionArr.push(example)
                }
                return this.getMarkdownTableRow([propertyLabel, descriptionArr.join(' '),]);

            }
        })

        return {
            html: [this.getMarkdownTableHead(), ...tableRows].join(EOL),
            relatedObjectsNames
        };
    }

    private renderSchema(schemaNameOrSchemaObject: string | object, level: number = 0) {

        const schema = typeof schemaNameOrSchemaObject === 'object' ? schemaNameOrSchemaObject : this.schemas[schemaNameOrSchemaObject]
        if (!schema) {
            throw new Error(`Schema "${schema}" not found`);
        }
        const { properties, title, type } = nodeWithTitleAndPropertiesSchema.validateSync(schema);
        const respopnseStrArr = [];

        if (title) {
            respopnseStrArr.push(`${"#".repeat(level + 2)} ${title}`)
        } else {
            if (typeof schemaNameOrSchemaObject === 'string') {
                throw new Error(`Missing title for ${schemaNameOrSchemaObject} object`)
            }
        }
        const relatedObjects: string[] = [];

        if (properties) {
            const { html, relatedObjectsNames } = this.renderPropertiesAsTableRow(properties, level)
            relatedObjects.push(...relatedObjectsNames)
            respopnseStrArr.push(html)
        }else if(type === 'string'){
            propertySchema.validateSync(schema)
            const { descriptionArr, relatedObjectsNames } = this.renderProperty(schema, level)
            relatedObjects.push(...relatedObjectsNames)
            respopnseStrArr.push(descriptionArr.join(`${EOL}${EOL}`))
        }

        return { html: respopnseStrArr.join(EOL), relatedObjects }
    }

    public render(schemaName: string): string {
        if (this.redenderMode === RenderMode.Nested) {
            const { html } = this.renderSchema(schemaName)
            return html;
        }

        const schemasToRender = [schemaName];
        const renderedSchemas = [];
        const response: string[] = []

        while (schemasToRender.length) {
            const nextSchemaToRender = schemasToRender.shift()
            if (renderedSchemas.includes(nextSchemaToRender)) {
                continue
            }
            const { html, relatedObjects } = this.renderSchema(nextSchemaToRender)
            renderedSchemas.push(nextSchemaToRender)
            response.push(html)
            if (relatedObjects.length) {
                schemasToRender.push(...relatedObjects)
            }
        }
        return response.join(EOL);
    }

}