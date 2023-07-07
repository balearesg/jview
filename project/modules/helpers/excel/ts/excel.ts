import * as Excel from "exceljs";
import * as fs from "fs";

interface IParamsExcel {
    pathname: string;
    options: object;
    filename: string;
    data: object[];
    sheetName: string;
    otherDataSets: any;
}

export /* bundle */
class ExcelHandler{
    _columnsHeader: object[];
    get columnsHeader() {
        return this._columnsHeader;
    }

    set columnsHeader(columnsHeader) {
        this._columnsHeader = columnsHeader;
    }

    async createExcel({ pathname, options, filename, data, sheetName, otherDataSets }: IParamsExcel) {
        try {
            const workbook = new Excel.Workbook();
    
            workbook.views = [
                {
                    x: 0,
                    y: 0,
                    width: 10000,
                    height: 20000,
                    firstSheet: 0,
                    activeTab: 1,
                    visibility: "visible",
                },
            ];
    
            const worksheet = workbook.addWorksheet(sheetName);
            worksheet.columns = this.columnsHeader;
            worksheet.state = "visible";
            // await fs.promises.mkdir(pathname, { recursive: true });
            const filepath = `${pathname}/${filename}`;
    
            data.forEach((item) => {
                worksheet.addRow(item);
            });
            worksheet.addRow([]);
            
            if (otherDataSets) await this.insertOtherDataSets(otherDataSets, worksheet);
    
            await workbook.xlsx.writeFile(filepath, options);
        
            return { status: true };
        } catch (error) {
            return { status: false, error };
        }
    }

    async insertOtherDataSets(otherDataSets, worksheet){
        otherDataSets.forEach((item) => {
            // worksheet.columns = item.columns;
            const indexColumnsHeader = worksheet.lastRow._number + 1;;
            const headerRow = worksheet.getRow(indexColumnsHeader)
            headerRow.values = item.columns;

            item.data.forEach((row) => {
                const indexLastRow = worksheet.lastRow._number + 1;;
                const lastRow = worksheet.getRow(indexLastRow);
                lastRow.values = row;
            })
            worksheet.addRow([]);
            worksheet.addRow([]);
        })
    }
}