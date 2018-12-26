export function json2table100(json: any): string {
    let cols: string[] = Object.keys(json[0]);
    let headerRow: string = "";
    let bodyRows: string = "";
    cols.map(function (col: string): void {
        headerRow += "<th>" + capitalizeFirstLetter(col) + "</th>";
    });
    json.map(function (row: any): void {
        bodyRows += "<tr>";
        // loop over object properties and create cells
        cols.map(function (colName: string): void {
            bodyRows += "<td>" + (typeof row[colName] === "object" ? JSON.stringify(row[colName]) : row[colName]) + "</td>";
            // error in article slash missing (/td)
        });
        bodyRows += "</tr>";
    });
    return "<table><thead><tr>" +
        headerRow +
        "</tr></thead><tbody>" +
        bodyRows +
        "</tbody></table>";
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}