
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
//            dimensions: dimension of the square image in pixels, proportion: 1/proportion, where this ratio defines the sky to ground switch
    //Notes: function assumes the images are coming in as square images
function generateBackground(skyImageSrc, groundImageSrc, dimensions, proportion)
{
    var heightRepeat = window.innerHeight/dimensions;
    var skyToGroundSwitch = Math.ceil((heightRepeat/proportion) * (proportion - 1));
    var skyToGroundSwitchLocation = window.innerHeight/proportion * (proportion -1)
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
    return skyToGroundSwitchLocation;
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
                        item.style.width = '40px';
                        item.style.height = '40px';
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
    var character = document.getElementById('green-character');
    var bottom = character.style.bottom; // TODO there is a problem here
    var left = character.style.left;
    var item = document.getElementById(imageSrcID);
    item.parentNode.classList.toggle('filled');
    item.style.left = left;
    item.style.bottom = bottom; 
    item.style.width = 'auto';
    item.style.height = 'auto';
    item.style.position = "fixed";
    item.classList.toggle("inInventory");
    document.getElementsByTagName('main')[0].append(item);
}
function unWalkableItem(imageSrcID)
{   
    var unWalkable = document.getElementById(imageSrcID);
    unWalkable.classList = "unWalkable";
}
//Purpose: Allows our sprite to move via a selected interval that ends on keyup
// Arguments: argument requires our character that we want to move to be globally defined
//Note: also includes our open inventory key mapping
function move(element) {
    element.style.position = 'fixed'
    function moveToCoordinates(left, bottom) 
    {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }
    function RegisterArrowKeys(left, bottom, callback)
    {
        let direction = null;
        let x = left;
        let y = bottom;

        element.style.left = x + 'px'
        element.style.bottom = y + 'px'
        
        function moveCharacter()
        { 
            if(direction === 'west'){
                x-=1
            }
            if(direction === 'north'){
                y+=1
            }
            if(direction === 'east'){
                x+=1
            }
            if(direction === 'south'){
                y-=1
            }
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }
        setInterval(moveCharacter, 1)
        document.addEventListener('keydown', function(e)
        {
            if(e.repeat) return;
        
            if(e.key === 'ArrowLeft'){
                direction = 'west'
            }
            if(e.key === 'ArrowUp'){
                direction = 'north'
            }
            if(e.key === 'ArrowRight'){
                direction = 'east'
            }
            if(e.key === 'ArrowDown'){
                direction = 'south'
            }
            if(e.key == 'e')
            {
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
            callback(direction)
        })
        
        document.addEventListener('keyup', function(e){
            direction = null
            callback(direction)
        })
    }

    return {
        to: moveToCoordinates,
        withArrowKeys: RegisterArrowKeys
    }
}
//Purpose: Changes the gif of our character during a key event to walk in the proper direction (a callback of our move function)
//Arguments: the direction the character is moving
function handleDirectionChange(direction){
    if(direction === null){
        character.src = `assets/green-character/static.gif`
    }
    if(direction === 'west'){
        character.src = `assets/green-character/west.gif`
    }
    if(direction === 'north'){
        character.src = `assets/green-character/north.gif`
    }
    if(direction === 'east'){
        character.src = `assets/green-character/east.gif`
    }
    if(direction === 'south'){
        character.src = `assets/green-character/south.gif`
    }
}
//Purpose: Instantiate a promised, NPC Object and loop its walking
// Parametres: starting X and Y coordinate for the sprite, and the number of pixels it moves per move interval
function newNonPlayableCharacter(x, y, speed) {
    let element = NPC
    element.style.zIndex = 1;
    let direction = null;
    function moveCharacter() {
        if (direction === 'west') {
            if (x > 0)
            {
                x -= speed
            }
        }
        if (direction === 'north') {
            if (y < skyToGroundSwitchLocation)
            {
                y += speed
            }
        }
        if (direction === 'east') {
            if (x < window.innerWidth) //TODO: there is a problem here im not sure what
            {
                x += speed
            }
        }
        if (direction === 'south') {
            if (y > 0)
            {
                y -= speed
            }
        }
        element.style.left = x + 'px'
        element.style.bottom = y + 'px'
    }

    setInterval(moveCharacter, 1)

    function walkEast(time) {
        return new Promise(resolve => {
            direction = 'east'
            element.src = `./assets/red-character/east.gif`
            setTimeout(() => {
                stop()
                resolve()
            }, time)
        })
    }

    function walkNorth(time) {
        return new Promise(resolve => {
            direction = 'north'
            element.src = `./assets/red-character/north.gif`
            setTimeout(() => {
                stop()
                resolve() //returns a promise object for us
            }, time)
        })
    }

    function walkWest(time) {
        return new Promise(resolve => {
            direction = 'west'
            element.src = `./assets/red-character/west.gif`
            setTimeout(() => {
                stop()
                resolve()
            }, time)
        })
    }

    function walkSouth(time) {
        return new Promise(resolve => {
            direction = 'south'
            element.src = `./assets/red-character/south.gif`
            setTimeout(() => {
                stop()
                resolve()
            }, time)
        })
    }

    function stop() {
        direction = null
        element.src = `./assets/red-character/static.gif`
    }

    return {
        element: element,
        walkWest: walkWest,
        walkNorth: walkNorth,
        walkEast: walkEast,
        walkSouth: walkSouth,
        stop: stop
    }
}

//////////////////////////////////////////////////////////////Execution////////////////////////////////////////////////////////////

const skyToGroundSwitchLocation=  generateBackground('sky', 'grass', 100, 3);

//Definition: Object that holds all images that are static background pieces
//Key: Value => ImageId : [[xCoord, yCoord], FileExtension, isNotBackground]
var settingImageObject = 
{
    'tree'            : [[200, 300], '.png', true],
    'pillar'          : [[350, 100], '.png', true],
    'crate'           : [[500, 425], '.png', true],
    'well'            : [[300, 425], '.png', true],
    'pine-tree'       : [[450, 350], '.png', true]
}
//Definition: Object that holds all images that are clickable items
//Key: Value => ImageId : [[xCoord, yCoord], FileExtension, isNotBackground]
var interactableImageObject =
{
    'shield' : [[165, 185], '.png', true],
    'staff'  : [[600, 100], '.png', true],
    'sword'  : [[700, 300], '.png', true]
}
//Definition: Object (because I expect multiple to come up), that holds our moveable sprite
//Key:Value => ImageID : [[xCoord, yCoord], fileExtension, isNotBackground]
var CharacterSprite =
{
    'green-character' : [[100, 100], '.gif', true],
    'red-character'   : [[100,200], '.gif', true]
}

//Inserting in all Images
for (let i =0; i< Object.keys(CharacterSprite).length; i++)
{
    let name = Object.keys(CharacterSprite)[i];
    addImage(name, CharacterSprite[name][0][0],CharacterSprite[name][0][1], CharacterSprite[name][1], CharacterSprite[name][2] );
}

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

//Adding in User Sprite's Arrow functionality
const character = document.getElementById('green-character');
move(character).withArrowKeys(100, 250, handleDirectionChange);


//Part 5: Adding in the NPC's looping movement
var NPC = document.getElementById('red-character');
NPC = newNonPlayableCharacter(700,120,1);
function NPCLoop()
{
     NPC.walkNorth(3400)
        .then(() => NPC.walkEast(1200))
        .then(() => NPC.walkSouth(300))
        .then(() => NPC.walkEast(500))
        .then(() => NPC.walkSouth(4500))
        .then(() => NPC.walkWest(2700))
        .then(() => NPC.walkNorth(400))
        .then(() => NPCLoop())
}
NPCLoop();


//Just for now: indicate how to open inventory
//will have to add an await to the npc later to show full pathingworks
//alert('press e to open the inventory, and double click to pickup or drop items.');