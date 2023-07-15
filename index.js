
///!SECTION   Functions Pertaining to displaying images

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
        var mainHolder = document.getElementsByTagName('main')[0];
        mainHolder.append(elementImage);  
    }
    else
    {
        elementImage.classList = elementID;
        var backgroundDiv = document.getElementById("background");   
        backgroundDiv.append(elementImage);
    }
  
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
            if (j < skyToGroundSwitch)
            {
                addImage(groundImageSrc, xCoord, yCoord, '.png', false)
            }
            else
            {
                addImage(skyImageSrc, xCoord, yCoord, '.png', false)
            }
        }
    }


}
//!SECTION functions pertaining to dynamics
//Purpose: Add an event listener to remove an item from the screen upon double clicking (by changing display to none)
//Arguments: imageSrcID = the id of the image element to be removed
function pickupItem(imageSrcID)
{
    var item = document.getElementById(imageSrcID);
    item.classList = "item";
    item.addEventListener('dblclick', () => {
        if (item.classList.value.includes('inInventory'))
        {
            dropItem(imageSrcID);
        }
        else
        {
            let inventorySlots = document.querySelectorAll("#inventory-list li");
            let counter = 0;
                for (let i = 0; i< inventorySlots.length; i++)
                {
                    if(inventorySlots[i].classList.value.includes('filled'))
                    {
                        counter++;
                    }
                    else
                    {
                        inventorySlots[i].classList.toggle('filled');
                        item.width = 40;
                        item.height = 40;
                        item.style.position = "";
                        item.style.left = "0px"
                        item.style.bottom = "0px";
                        item.classList.toggle('inInventory');
                        inventorySlots[i].append(item);
                        break;
                    }
                }
            if (counter == inventorySlots.length)
            {
                alert('inventory is full');
            }
        }
    })
}
function dropItem(imageSrcID)
{
    
}
function unWalkableItem(imageSrcID)
{   
    var unWalkable = document.getElementById(imageSrcID);
    unWalkable.classList = "unWalkable";
}
//Adding to the body

generateBackground('sky', 'grass', 100);
//Definition: Object that holds all images that are static background pieces
//Key: Value => ImageId : [[xCoord, yCoord], FileExtension]
var settingImageObject = 
{
    'tree'            : [[200, 300], '.png', true],
    'pillar'          : [[350, 100], '.png', true],
    'crate'           : [[500, 425], '.png', true],
    'well'            : [[300, 425], '.png', true],
    'pine-tree'       : [[450, 350], '.png', true]
}
//Definition: Object that holds all images that are clickable items
//Key: Value => ImageId : [[xCoord, yCoord], FileExtension]
var interactableImageObject =
{
    'shield' : [[165, 185], '.png', true],
    'staff'  : [[600, 100], '.png', true],
    'sword'  : [[700, 300], '.png', true]
}
//Definition: Object (because I expect multiple to come up), that holds our moveable sprite
//Key:Value => ImageID : [[xCoord, yCoord], fileExtension]
var CharacterSprite =
{
    'green-character' : [[100, 100], '.gif', true]
}
var characterID = Object.keys(CharacterSprite)[0];

addImage(characterID, CharacterSprite[characterID][0][0], CharacterSprite[characterID][0][1],  CharacterSprite[characterID][1],  CharacterSprite[characterID][2]);

for (let i =0; i< Object.keys(settingImageObject).length; i++)
{
    let name = Object.keys(settingImageObject)[i];
    addImage(name, settingImageObject[name][0][0],settingImageObject[name][0][1], settingImageObject[name][1], settingImageObject[name][2] );
    unWalkableItem(name);
}

for (let i =0; i< Object.keys(interactableImageObject).length; i++)
{
    let name = Object.keys(interactableImageObject)[i];
    addImage(name, interactableImageObject[name][0][0],interactableImageObject[name][0][1], interactableImageObject[name][1], interactableImageObject[name][2]);
    pickupItem(name);
}


//Allowing a character to move

function registerArrowKey(event)
{
    var character = document.getElementById(characterID);
    var keyClicked = event.which || event.keyCode //depends on browser
    switch (keyClicked)
    {
        case 37:
            moveLeft(character);
            character.src ='/assets/green-character/west.gif'
            break;
        case 38:
            moveUp(character);
            character.src = '/assets/green-character/north.gif'
            break;
        case 39:
            moveRight(character);
            character.src = '/assets/green-character/east.gif'
            break;
        case 40:
            moveDown(character);
            character.src = '/assets/green-character/south.gif'
            break;
        case 69:
            let inventory = document.getElementById('inventory');
            inventory.classList.toggle('shown');
            if (inventory.classList.contains('shown'))
            {
                inventory.style.display = "";
            }
            else
            {
                inventory.style.display = "none";
            }
    }
}
function moveLeft(character) 
{
    character.style.left = parseInt(character.style.left) - 5 + "px";
}
function moveUp(character) 
{
    character.style.bottom = parseInt(character.style.bottom) + 5 + "px";
}
function moveRight(character) 
{
    character.style.left = parseInt(character.style.left) + 5 + "px";
}
function moveDown(character) 
{
    character.style.bottom = parseInt(character.style.bottom) - 5 + "px";
}


