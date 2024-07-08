import { TDocumentDefinitions } from "pdfmake/interfaces";
import { showDate, capitalizeWords } from "../../utils/dataUtils";
import { IDocDefinition } from "./type.js"
const createDocDefinition = ({
  amounts,
  client,
  prices,
  products,
  saleCondition,
  subTotal,
  total,
}: IDocDefinition): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      { text: showDate(), style: "date" },
      { text: "Resumen", style: "title" },
      { text: `Cliente: ${capitalizeWords(client)}`, style: "info" },
      {
        text: `Condición de la venta: ${saleCondition.toLowerCase()}`,
        style: "info",
      },
      {
        layout: "lightHorizontalLines",
        table: {
          headerRows: 1,
          widths: ["*", "auto", 100, "*"],

          body: products.map((item, index) => [
            { text: item, style: "products" },
            { text: amounts[index], style: "amount" },
            { text: prices[index], style: "price" },
            { text: subTotal[index], style: "price" },
          ]),
        },
      },
      {
        columns: [
          { text: "Total", style: "totalString" },
          { text: `${total}`, style: "totalNumber" },
        ],
      },
    ],
    styles: {
      title: {
        margin: [0, 15],
        characterSpacing: 1,
        fontSize: 20,
      },
      date: {
        margin: [0, 15],
        fontSize: 14,
      },
      info: {
        margin: [0, 15],
        characterSpacing: 1,
        fontSize: 14,
      },
      products: {
        margin: [0, 15],
        alignment: "left",
        characterSpacing: 1,
        fontSize: 13,
      },
      amount: {
        margin: [0, 15],
        alignment: "center",
        characterSpacing: 1,
        fontSize: 13,
      },
      price: {
        margin: [0, 15],
        alignment: "right",
        characterSpacing: 1,
        fontSize: 13,
      },
      totalString: {
        margin: [0, 15],
        alignment: "left",
        characterSpacing: 1,
        fontSize: 23,
      },
      totalNumber: {
        margin: [0, 15],
        alignment: "right",
        characterSpacing: 1,
        fontSize: 23,
      },
    },
  };
  return docDefinition;
};

export default createDocDefinition;