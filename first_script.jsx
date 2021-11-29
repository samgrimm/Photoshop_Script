#target photoshop

main();

function main() {

  var listOfPhrases = [
    "Do what you love",
    "Grow where you are planted",
    "Never stop looking up",
    "Find joy in the small things"
  ]

  // open a file
  var artFolder = Folder.selectDialog('open folder with the images');
  var IGFolder = Folder.selectDialog('choose folder where to save the IG images');

  var fileList = artFolder.getFiles();

  for(var i = 0; i< fileList.length; i++) {
    if(fileList[i].name === '.DS_Store')  { continue; }

    var artFile = fileList[i];
    app.open(artFile);
    // copy the content of file
    app.activeDocument.selection.selectAll();

    app.activeDocument.selection.copy();
    app.activeDocument.close();

    // create a new file
    app.documents.add(UnitValue(1080, 'PX'), UnitValue(1080, 'PX'), 72);

    // paste the content in new file
    app.activeDocument.paste();

    //resize
    var artLayer = activeDocument.layers.getByName('Layer 1');
    var width = (artLayer.bounds[2] - artLayer.bounds[0]).as('px');
    var height = (artLayer.bounds[3] - artLayer.bounds[1]).as('px');

    var ratio;

    if ( height > width ) { // portrait
      ratio = (1080 / height) * 100;
    } else {
      // landscape or square
      ratio = (1080 / width) * 100;
    }

    artLayer.resize(ratio, ratio, AnchorPosition.TOPLEFT);
    // app.activeDocument.close();
    // add text and IG handle
    var text = listOfPhrases[Math.floor(Math.random() * listOfPhrases.length)];
    insertText(text, 110, "1000 pixels", "500 pixels", [30,30]);
    insertText('@samantha.makes.things', 72, "900 pixels", "200 pixels", [70,900]);

    // save and close
    var fileName = IGFolder + '/' + artFile.name.substr(0, artFile.name.lastIndexOf('.')) + "-instagram";
    var saveFile = File(fileName);
    jpegFileSaver(app.activeDocument, saveFile, 10);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
  }
}

function jpegFileSaver(doc, saveFile, quality) {
  var saveOptions = new JPEGSaveOptions();
  saveOptions.embedColorProfile = true;
  saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
  saveOptions.quality = quality;
  app.activeDocument.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);
}


function insertText(text, fontSize, width, height, position) {
  var textLayer = app.activeDocument.artLayers.add();
  textLayer.kind = LayerKind.TEXT;
  var textItem = textLayer.textItem;

  textItem.kind = TextType.PARAGRAPHTEXT;
  textItem.font = 'Didot';
  textItem.size = fontSize;
  textItem.position = position;
  textItem.contents = text;
  textItem.width = new UnitValue(width);
  textItem.height = new UnitValue(height);
  var color = new SolidColor();
  color.rgb["hexValue"] = "7f7f7f";
}
