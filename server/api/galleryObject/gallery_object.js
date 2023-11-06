const { Client } = require('pg');
const fetch = require('node-fetch'); 
let counter = 0;

class galleryObject {
    //view count, like count, thumbnail, user name, date posted, title, discussion board object
    constructor(title, user_name, date_posted, like_count, view_count, discussion_board, type, visibility) { //thumbnail will be added once we figure out automatic thumbails
        this.title = title;
        this.user_name = user_name;
        this.date_posted = date_posted;
        //this.thumbnail = thumbnail;
        this.like_count = like_count;
        this.view_count = view_count;
        this.discussion_board = discussion_board;
        this.id = counter;
        counter++;
        this.type = type; //type will be either project, block, or lesson
        this.visibility = visibility; //visibility will be either organization, classroom or public

        this.init();
    }

    async init() {
        const data = {
            title: this.title,
            user_name: this.user_name,
            date_posted: this.date_posted,
            like_count: this.like_count,
            view_count: this.view_count,
            discussion_board: this.discussion_board,
        };

        try {
            const response = await fetch('http://172.18.0.3', { //store to container: casmm-db-dev
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Data sent to the database successfully.');
            } else {
                console.error('Failed to send data to the database.');
            }
        } catch (error) {
            console.error('Error sending data to the database:', error);
        }
    }

}