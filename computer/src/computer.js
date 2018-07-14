var computerLayer = cc.Layer.extend({
    sprite:null,
    nums: new Array(10),
    rects : new Array(10),
    input: null,
    guess:"",
    guess1:"",
    back:null,
    enter:null,
    enterrect:null,
    backrect:null,
    divide:null,
    dividerect:null,
    add:null,
    addrect:null,
    close:null,
    closerect:null,
    delete:null,
    deldterect:null,
    reload:null,
    reloadrect:null,
    addfirstnumber:null,
    addsecondnumber:null,
    deletefirstnumber:null,
    deldtesecondnumber:null,
    addnumber:null,


    ctor:function () {
        this._super();


        this.initLayout();

        this.setUpmymouse(this);


        return true;
    },

    initLayout: function(){
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.number_plist, res.number_png);

        // number key
        var px, py;
        for (i = 0; i<this.nums.length; i++){
            this.nums[i] = new cc.Sprite("#number" + i + ".png");

            if (i==0){
                px = 3;
                py = 1;
            }else{
                px = (i-1) % 3 + 2;
                py = parseInt((i-1) / 3) + 2;
            }
            this.nums[i].x = cc.winSize.width * px /7;
            this.nums[i].y = cc.winSize.height * py /8;

            this.rects[i] = new cc.Rect(
                this.nums[i].x - this.nums[i].width/2,
                this.nums[i].y - this.nums[i].height/2,
                this.nums[i].width,
                this.nums[i].height
            );


            this.addChild(this.nums[i]);
        }



        this.input = new cc.LabelTTF("","", 48);
        this.input.x = cc.winSize.width * 3 / 6;
        this.input.y = cc.winSize.height * 6 / 8;
        this.addChild(this.input);


        this.back = new cc.Sprite(res.back_png);
        this.back.x = cc.winSize.width *2/7;
        this.back.y = cc.winSize.height *1/8;
        this.addChild(this.back);

        this.backrect = new cc.Rect(
            this.back.x - this.back.width/2,
            this.back.y - this.back.height /2,
            this.back.width,
            this.back.height
        );

        this.enter = new cc.Sprite(res.enter_png);
        this.enter.x = cc.winSize.width * 4 / 7;
        this.enter.y = cc.winSize.height * 1 / 8;
        this.addChild(this.enter);

        this.enterrect = new cc.Rect(
            this.enter.x - this.enter.width/2,
            this.enter.y - this.enter.height /2,
            this.enter.width,
            this.enter.height
        );

        this.divide = new cc.Sprite(res.divide_png);
        this.divide.x = cc.winSize.width *5/7;
        this.divide.y = cc.winSize.height *1/8;
        this.addChild(this.divide);

        this.dividerect = new cc.Rect(
            this.divide.x - this.divide.width/2,
            this.divide.y - this.divide.height /2,
            this.divide.width,
            this.divide.height
        );

        this.add = new cc.Sprite(res.divide_png);
        this.add.x = cc.winSize.width *5/7;
        this.add.y = cc.winSize.height *4/8;
        this.addChild(this.add);

        this.addrect = new cc.Rect(
            this.add.x - this.add.width/2,
            this.add.y - this.add.height /2,
            this.add.width,
            this.add.height
        );

        this.add = new cc.Sprite(res.add_png);
        this.add.x = cc.winSize.width *5/7;
        this.add.y = cc.winSize.height *4/8;
        this.addChild(this.add);

        this.addrect = new cc.Rect(
            this.add.x - this.add.width/2,
            this.add.y - this.add.height /2,
            this.add.width,
            this.add.height
        );

        this.close = new cc.Sprite(res.close_png);
        this.close.x = cc.winSize.width *5/7;
        this.close.y = cc.winSize.height *2/8;
        this.addChild(this.close);

        this.closerect = new cc.Rect(
            this.close.x - this.close.width/2,
            this.close.y - this.close.height /2,
            this.close.width,
            this.close.height
        );

        this.delete = new cc.Sprite(res.deldete_png);
        this.delete.x = cc.winSize.width  *5/7;
        this.delete.y = cc.winSize.height *3/8;
        this.addChild(this.delete);

        this.deldterect = new cc.Rect(
          this.delete.x - this.delete.width /2,
          this.delete.y - this.delete.height /2,
          this.delete.width,
          this.delete.height

        );

        this.reload = new cc.Sprite(res.reload_png);
        this.reload.x = cc.winSize.width  *5/7;
        this.reload.y = cc.winSize.height *5/8;
        this.addChild(this.reload);

        this.reloadrect = new cc.Rect(
            this.reload.x - this.reload.width /2,
            this.reload.y - this.reload.height /2,
            this.reload.width,
            this.reload.height

        );





    },


    setUpmymouse: function(layer) {


            cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                var x = event.getLocationX();
                var y = event.getLocationY();
                var point = new cc.Point(x, y);


                //
                for (var i = 0; i < layer.rects.length; i++) {
                    if (cc.rectContainsPoint(layer.rects[i], point)) {
                        layer.guess+= i;
                        layer.input.setString(layer.guess);
                    }
                }

                if(layer.guess.length > 0 ){
                    if(cc.rectContainsPoint(layer.backrect,point)){
                        layer.guess=layer.guess.substr(0,layer.guess.length-1);
                        layer.input.setString(layer.guess);
                    }

                }




                //+號
                if(cc.rectContainsPoint(layer.addrect,point)) {
                    layer.addfirstnumber = layer.guess; //把第一個按的數字存起來
                    layer.guess = ""; //然後把guess清空
                    layer.input.setString(layer.guess); //按下去之後會清空guess顯示在input
                    // cc.log(layer.addfirstnumber);  //顯示一下第一個數字
                }
                if(cc.rectContainsPoint(layer.enterrect,point)){
                    if (layer.addfirstnumber) {
                        layer.addsecondnumber = layer.guess;
                        layer.input.setString(layer.guess);
                        // cc.log(layer.addsecondnumber);
                        layer.addfirstnumber = parseFloat(layer.addfirstnumber);
                        layer.addsecondnumber = parseFloat(layer.addsecondnumber);
                        layer.addnumber = layer.addfirstnumber + layer.addsecondnumber;
                        layer.input.setString(layer.addnumber);
                    }
                    }
                    //減號

                    // if(cc.re)





                    if(cc.rectContainsPoint(layer.reloadrect,point)){
                    if(layer.input){
                        layer.guess="";
                        layer.input.setString(layer.guess);
                    }


                    };



            },

        },this);
        },
});

var computerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new computerLayer();
        this.addChild(layer);
    }
});
