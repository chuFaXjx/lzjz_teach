export function openDownloadDialog(url, saveName) {
  if (typeof url == "object" && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement("a");
  aLink.href = url;
  aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event;
  if (window.MouseEvent) event = new MouseEvent("click");
  else {
    event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
  }
  aLink.dispatchEvent(event);
}

// csv转sheet对象
export function csv2sheet(csv) {
  var sheet = {}; // 将要生成的sheet
  csv = csv.split("\n");
  csv.forEach(function (row, i) {
    row = row.split(",");
    if (i == 0)
      sheet["!ref"] =
        "A1:" + String.fromCharCode(65 + row.length - 1) + (csv.length - 1);
    row.forEach(function (col, j) {
      sheet[String.fromCharCode(65 + j) + (i + 1)] = { v: col };
    });
  });
  return sheet;
}

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
export function sheet2blob(sheet, sheetName) {
  sheetName = sheetName || "sheet1";
  var workbook = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = sheet;
  // 生成excel的配置项
  var wopts = {
    bookType: "xlsx", // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: "binary",
  };
  var wbout = XLSX.write(workbook, wopts);
  var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  // 字符串转ArrayBuffer
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return blob;
}

// 传入csv，执行后就会弹出下载框
export function exportExcel(aoa, fillename = "导出.xlsx") {
  //   var sheet = csv2sheet(csv);
  //   var blob = sheet2blob(sheet);
  //   openDownloadDialog(blob, fillename);
  var sheet = XLSX.utils.aoa_to_sheet(aoa);
  openDownloadDialog(sheet2blob(sheet), fillename);
}
