import React , {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Figure = (props) =>{
    return(
        <React.Fragment>
            <img
                src={props.author.avatarUrl}
                alt={props.author.alt}
            />
        </React.Fragment>
    )
}
const MnInfo = (props) =>{
    return(
        <React.Fragment>
            <h6>{props.name}</h6>
            <span>{props.email}</span>
        </React.Fragment>
    )
}
const MnData = [
    {
        author: {
            alt: 'Hello Kitty',
            avatarUrl: 'https://placekitten.com/g/64/64',
          },
          name:'Santosh khatri',
          email:'khatri@fieldsight.org'
    },
    {
        author: {
            alt: 'Hello Kitty',
            avatarUrl: 'https://placekitten.com/g/64/64',
          },
          name:'Santosh khatri',
          email:'khatri@fieldsight.org'
    },
    {
        author: {
            alt: 'Hello Kitty',
            avatarUrl: 'https://placekitten.com/g/64/64',
          },
          name:'Santosh khatri',
          email:'khatri@fieldsight.org'
    },
    {
        author: {
            alt: 'Hello Kitty',
            avatarUrl: 'https://placekitten.com/g/64/64',
          },
          name:'Santosh khatri',
          email:'khatri@fieldsight.org'
    },
    {
        author: {
            alt: 'Hello Kitty',
            avatarUrl: 'https://placekitten.com/g/64/64',
          },
          name:'Santosh khatri',
          email:'khatri@fieldsight.org'
    }
    ,{
        author: {
            alt: 'Hello Kitty',
            avatarUrl: 'https://placekitten.com/g/64/64',
          },
          name:'Santosh khatri',
          email:'khatri@fieldsight.org'
    },
    {
        author: {
            alt: 'Hello Kitty',
            avatarUrl: 'https://placekitten.com/g/64/64',
          },
          name:'Santosh khatri',
          email:'khatri@fieldsight.org'
    },
    {
        author: {
            alt: 'Hello Kitty',
            avatarUrl: 'https://placekitten.com/g/64/64',
          },
          name:'Santosh khatri',
          email:'khatri@fieldsight.org'
    }
]
const MnList = (props) => {
    return(
        <li>
            <figure>
                <Figure
                    author={props.item.author}
                />
            </figure>
            <div className="content">
                <MnInfo
                    name = {props.item.name}
                    email = {props.item.email}
                />
            </div>
        </li>
    )
}
class ProjectManager extends Component {
    render (){
        return(
            <React.Fragment>
                <PerfectScrollbar>
                    <ul>
                        {MnData.map((item,i) => <MnList item = {item} />)}
                    </ul>
                </PerfectScrollbar>
            </React.Fragment>
        )
    }
}
export default ProjectManager;