import java.io.*;
import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.text.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;

public class PdfToExcelConverter {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Uso: java PdfToExcelConverter <caminho_pdf>");
            return;
        }
        String pdfPath = args[0];
        String excelPath = "output.xlsx"; // Salva na mesma pasta
        try {
            // Extrair texto do PDF
            PDDocument document = PDDocument.load(new File(pdfPath));
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            document.close();

            // Criar Excel
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Texto PDF");
            String[] lines = text.split("\n");
            for (int i = 0; i < lines.length; i++) {
                Row row = sheet.createRow(i);
                Cell cell = row.createCell(0);
                cell.setCellValue(lines[i]);
            }
            FileOutputStream fos = new FileOutputStream(excelPath);
            workbook.write(fos);
            fos.close();
            workbook.close();
            System.out.println("Conversão concluída. Arquivo salvo em " + excelPath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
