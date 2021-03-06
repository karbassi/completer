// This script will search your layers for font information and pop up a complete list of fonts used

// Written by David Klawitter

#target photoshop

main();

///////////////////////////////////////////////////////////////////////////
// Function: userFriendly
// Usage: Converts constants to user-friendly copy
// Input: string
// Return: a string
///////////////////////////////////////////////////////////////////////////
function userFriendly(obj) 
{
  if (obj == "TypeUnits.PIXELS")
    return "px";
  else if (obj == "TypeUnits.POINTS") {
    return "pt";
  } else {
    return obj;
  }
}

function findTextLayers(doc, foundLayers) {
  var layersCount = doc.layers.length;
  
  for (var layersIndex = 0; layersIndex < layersCount; layersIndex++) {
    var layerRef = doc.layers[layersIndex];

    if (layerRef.typename == "ArtLayer") {
      if (layerRef.visible && layerRef.kind == "LayerKind.TEXT") {
        var text = layerRef.textItem;
        foundLayers.push(text.font);
      }
    } else if (layerRef.typename == "LayerSet") {
      if (layerRef.visible) {
        findTextLayers(layerRef, foundLayers);
      }
    }
  }
}

function main()
{
  var doc = app.activeDocument;
  var textLayers = new Array();
  
  findTextLayers(doc, textLayers)
   
  // Sort, remove duplicates and display results
  var sorted_arr = textLayers.sort();
  
  sorted_arr.reverse();
  sorted_arr.push("Font Usage");
  sorted_arr.reverse();
  alert(sorted_arr.join('\n'));
}