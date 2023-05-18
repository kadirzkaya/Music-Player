class Music{
    constructor(title, singer, img, file){
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;
    }

    getName(){
        return this.title +" - "+this.singer;
    }
}

const musicList=[
    new Music("Bosver","Nilüfer","1.jpeg","1.mp3"),
    new Music("Bu da Geçer mi Sevgilim","Yalın","2.jpeg","2.mp3"),
    new Music("Aramızda Uçurumlar","Suat Suna","3.jpeg","3.mp3"),
    new Music("Yanımda Kal","Harun Kolçak - Gökhan Türkmen","4.jpeg","4.mp3"),
    new Music("Denize Bıraksam","Göksel","5.jpg","5.mp3"),
    new Music("Nerdesin","Gece Yolcuları","6.jpg","6.mp3"),
    new Music("Hayata Merhaba De","Fettah Can","7.jpg","7.mp3")
]