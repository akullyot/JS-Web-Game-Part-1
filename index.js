
//Purpose: Creates a fixed image element and places it into the body of index.html
//Arguments: elementID = string id name that is also the relative link to the file, assuming it is in the assets folder, 
//           xCoord = the left offset of the image, yCoord = the bottom offset of the image 
//           fileExtension = file type string,  isNotBackground = boolean deciding if an id should be added
function addImage(elementID, xCoord, yCoord, fileExtension, isNotBackground)
{
    elementImage = document.createElement('img');
    elementImage.src =  "/assets/" + elementID + fileExtension;
    elementImage.style.position = 'fixed';
    elementImage.style.left = xCoord + "px";
    elementImage.style.bottom = yCoord + "px";
    if (isNotBackground)
    {
        elementImage.id = elementID;
    }
    document.body.append(elementImage);    
}
//Purpose: Add an event listener to remove an item from the screen upon double clicking (by changing display to none)
//Arguments: imageSrcID = the id of the image element to be removed
function pickupItem(imageSrcID)
{
    var item = document.getElementById(imageSrcID);
    item.classList = "item";
    item.addEventListener('dblclick', () => {
        item.style.display = "none"
    })
}
//Purpose: Create a background with 1/4 of the background being a sky, and the rest being a green background
//Arguments: skyImageSrc = file extension, assuming assets folder, groundImageSrc = file extension, assuming assets folder
    //Notes: function assumes the images are coming in as square images
function generateBackground(skyImageSrc, groundImageSrc, dimensions)
{
    var heightRepeat = window.innerHeight/dimensions;
    var skyToGroundSwitch = Math.ceil((heightRepeat/3) * 2) ;
    var widthRepeat = window.innerWidth/dimensions;
    for (var j=0; j< heightRepeat; j++)
    {
        var yCoord = j *dimensions
        for (let i=0; i< widthRepeat; i++)
        {
            let xCoord = i * dimensions;
            console.log(xCoord);
            console.log(yCoord)
            if (j < skyToGroundSwitch)
            {
                addImage('grass', xCoord, yCoord, '.png', false)
            }
            else
            {
                addImage('sky', xCoord, yCoord, '.png', false)
            }
        }
    }


}
generateBackground('sky', 'grass', 100);
//Definition: Object that holds all images that are static background pieces
//Key: Value => ImageId : [[xCoord, yCoord], FileExtension]
var settingImageObject = 
{
    'tree'            : [[200, 300], '.png'],
    'pillar'          : [[350, 100], '.png'],
    'crate'           : [[500, 425], '.png'],
    'well'            : [[500, 425], '.png'],
    'green-character' : [[100, 100], '.gif']
}
//Definition: Object that holds all images that are clickable items
//Key: Value => ImageId : [[xCoord, yCoord], FileExtension]
var interactableImageObject =
{
    'shield' : [[165, 185], '.png'],
    'staff'  : [[600, 100], '.png']
}

for (let i =0; i< Object.keys(settingImageObject).length; i++)
{
    let name = Object.keys(settingImageObject)[i];
    addImage(name, settingImageObject[name][0][0],settingImageObject[name][0][1], settingImageObject[name][1], true);
}

for (let i =0; i< Object.keys(interactableImageObject).length; i++)
{
    let name = Object.keys(interactableImageObject)[i];
    addImage(name, interactableImageObject[name][0][0],interactableImageObject[name][0][1], interactableImageObject[name][1], true);
    pickupItem(name);
}