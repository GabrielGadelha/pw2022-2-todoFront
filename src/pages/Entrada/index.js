import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import LateralBar from '../../components/LateralBar';
import Topo from '../../components/Topo'
import List from '../../components/List';
import Form from '../../components/Form';
import api from '../../services/api';
import './style.css'

function Entrada () {
    const [itemsList, setItemsList] = useState([]);
    
    useEffect(
        ()=>{
            async function loadData(){
                //o ideal é receber o email a partir da login
                api.get("/todos/search/byEmail?email=primeiro@gmail.com")
                    .then((response)=>{
                        if (response.data) {
                           let tasks = response.data.map(function(obj) {
                                return Object.keys(obj).map(function(key) {
                                    return obj[key];
                                });
                            });
                            setItemsList(tasks);
                          
                        }
                    })
                    .catch(error =>{
                        alert("Erro ao carregar dados")
                        }
                    )
            }
            
            loadData();
        },[]);

        async function handleAddItemToList(newItem) {   // <------------ 
        
        function dataDeHoje(){
            let data = new Date(),
                dia  = data.getDate().toString(),
                diaF = (dia.length === 1) ? '0'+dia : dia,
                mes  = (data.getMonth()+1).toString(), 
                mesF = (mes.length === 1) ? '0'+mes : mes,
                anoF = data.getFullYear();
            return anoF+"-"+mesF+"-"+diaF;
        }
        const today = dataDeHoje();
        const dados = { "email": "primeiro@gmail.com",
            "todo": newItem,
            "data": today
        }
       
        api.post("/todos",dados)
        .then((response)=>{
            if (response.data) {
            let task = response.data.todo
            let deadline = response.data.data
            let id = response.data.id
            task = [deadline,task,id]
            setItemsList([...itemsList, task])
        }
        }) 
        .catch(error =>{
            alert("Erro ao inserir dados:" + error)
            }
        )
      }

      async function handleRemoveItemToList (item) {
       setItemsList(
           [...itemsList.filter(
               (task) => {
                    return task !== item
                    }
                )
            ]
        );
        api.delete(`/todos/${item[2]}`)
        .catch(error =>{
            alert("Erro ao carregar dados")
            }
        )
    }
    return (
        <div>
           <Topo />
           <LateralBar />
           <div className="content">
                <h1>Entrada</h1>
                <List itemsList={itemsList} onRmItem={handleRemoveItemToList} />
                <Form onAddItem={handleAddItemToList} />

                <Link to="/">sair</Link>
            </div>
        </div>
    );
}
export default Entrada;

