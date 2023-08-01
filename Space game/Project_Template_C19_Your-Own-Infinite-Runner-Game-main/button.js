class StateChange{
    constructor(){
      this.title = createImg('spaceimgs/takeOff.png');
      this.playButton = createImg('spaceimgs/play.png');
      this.infoButton = createImg('spaceimgs/Info.png');
      this.backstory = createElement('h3')
    }
  
    display(){
      this.title.position(windowWidth/2-205,windowHeight/2 - 300);
      this.title.size(300,300)

      this.playButton.position(windowWidth/2-300,windowHeight/2-50);
      this.playButton.size(150,150)

      this.infoButton.position(windowWidth/2+200,windowHeight/2-50);
      this.infoButton.size(150,150)
      this.infoButton.mousePressed(()=>{
        this.showInfo()
      })

      this.playButton.mousePressed(()=>{
        gameState="play";
        this.playButton.hide();
        this.infoButton.hide();
        this.backstory.hide();
        this.title.hide();
      })
    }
  
    showInfo(){
      var message = `Chandrayaan will be the first spacecraft to land on the South pole of the moon where no exploration hasn't happened so far.\nLunar dust and uneven surfaces complicates the mission.\nThis game aims to provide an awareness about the historic event that is about to happen in August 2023. \nChandryaan starts from earth and dodges all the asteroids and lunar dust.`
      this.backstory.html(message)
      this.backstory.class("leadersText");
      this.backstory.position(windowWidth/2-800, windowHeight/2);
    }
  }