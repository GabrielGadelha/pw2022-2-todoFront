import React from 'react';

const List = (props) => {

    const {itemsList} = props;
    return(
        <div style={{marginBottom: "10px"}}>
            {itemsList.map((item, index) => (
            <div>
                <tr>
                    <td>
                       <input type="radio" key={index} id={item} value={item} onClick={()=>props.onRmItem(item)}/>
                    </td>
                    <td>
                    <label style={{marginLeft: "5px" }}>{item[0]}</label>
                    </td>
                    <td>
                    <label style={{marginLeft: "5px" }}>{item[1]}</label>
                    </td>
                   
                 </tr> 
            </div>
           ))
            }           
        </div>
    )
}

export default List;