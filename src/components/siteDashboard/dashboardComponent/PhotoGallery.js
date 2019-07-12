import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
const IMAGES =
[{
        src: "/img/info-1.jpg",
        thumbnail: "/img/info-1.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: false,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: "/img/info-2.jpg",
        thumbnail: "/img/info-2.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        // tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},

{
        src: "/img/info-3.jpg",
        thumbnail: "/img/info-3.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
},
{
        src: "/img/info-4.jpg",
        thumbnail: "/img/info-4.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: false,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: "/img/info-5.jpg",
        thumbnail: "/img/info-6.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        // tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},

{
        src: "/img/info-1.jpg",
        thumbnail: "/img/info-1.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: false,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: "/img/info-2.jpg",
        thumbnail: "/img/info-2.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        // tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},

{
        src: "/img/info-3.jpg",
        thumbnail: "/img/info-3.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
},
{
        src: "/img/info-4.jpg",
        thumbnail: "/img/info-4.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: false,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: "/img/info-5.jpg",
        thumbnail: "/img/info-6.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        // tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},]

class PhotoGallery extends Component{
        render(){
                return (
                        <React.Fragment>
                                <PerfectScrollbar>
                                <Gallery images={IMAGES}/>
                                </PerfectScrollbar>
                                
                        </React.Fragment>		
                        );
        }
	
}

export default PhotoGallery;




