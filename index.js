"use strict"

const fs = require("fs");

const question = fs.readFileSync(__dirname + "/questions.json", "utf-8");
let data_question = JSON.parse(question);
let ListOfQuestResp = [];
let index_p = Math.floor(Math.random() * Object.keys(data_question["p"]).length) + 1;

function newIndexP(){
    /**
     * Esta función crea un nuevo indice comprobando si el indice ya ha sido usado anteriormente en la lista de preguntas y si no es así guarda el  indice en la lista, actualiza index_p.
     */
    do{
        index_p = Math.floor(Math.random() * Object.keys(data_question["p"]).length) + 1;
    }while(ListOfQuestResp.slice(-49).includes(index_p));
    
    ListOfQuestResp.push(index_p);
    
    if(ListOfQuestResp.length === 50){
        ListOfQuestResp = [];
    }
    const obj = data_question["r"][index_p];
    let valores = Object.values(obj);
    let valoraleatorio = Math.floor(Math.random() * (valores.length - 1)) + 1;
    while (obj["correct"] === obj[valoraleatorio]) {
        valoraleatorio = Math.floor(Math.random() * (valores.length - 1)) + 1;
    }
    [obj[correctAnswerIndex()], obj[valoraleatorio]] = [obj[valoraleatorio], obj[correctAnswerIndex()]];

    fs.writeFile(__dirname + "/questions.json", JSON.stringify(data_question, null, 2), (error) => {
        if (error) {
            console.error("Error al escribir el archivo");
        }
    });
    return index_p;
}
/**
 * 
 * @returns devuelve el titulo de la pregunta
 */
function readTitle(){
    return data_question["p"][index_p];
}
function searchTitle(title){
    if(typeof title === "string"){
        for(let i = 1; i <= Object.keys(data_question["p"]).length; i++){
            if(data_question["p"][i] == title){
                index_p = i;
                return true;
            }
        }
    }else{
        return console.error("El titulo debe ser un string");
    }
}
/**
 * 
 * @returns devuelve las respuestas de la pregunta
 */
function readResponse(){
    let Resp = "";
    for(let i = 1; i <= Object.keys(data_question["r"][index_p]).length; i++){
        if(data_question["r"][index_p][i] == undefined){
            break;
        }
        Resp = Resp + i + ". " + data_question["r"][index_p][i] + "\n";
    }
    return Resp;
}
/**
 * 
 * @returns devuelve el indice de la respuesta correcta
 */
function correctAnswerIndex(){
    for(let i = 1; i <= Object.keys(data_question["r"][index_p]).length; i++){
        if(data_question["r"][index_p][i] == undefined){
            break;
        }
        if(data_question["r"][index_p][i] == data_question["r"][index_p]["correct"]){
            return i;
        }
    }
}
/**
 * @param {string} resp
 * @return {boolean}
 */
function isCorrect(resp){
    if(typeof resp === "string"){
        if(resp === data_question["r"][index_p]["correct"]){
            return true;
        }else{
            return false;
        }
    }else if(typeof resp === "number"){
        if(resp === correctAnswerIndex()){
            return true;
        }else{
            return false;
        }
    }
}
/**
 * @returns devuelve la respuesta correcta
 */
function correctAnswer(){
    return data_question["r"][index_p]["correct"];
}
/**
 * @param {number} indexp
 * @param {number} index
 * @returns devuelve la respuesta correcta seleccionada
 */
function correctAnswerselected(indexp, index){
    return data_question["r"][indexp][index];
}
module.exports = {
    readTitle,
     readResponse,
      correctAnswer,
       correctAnswerIndex,
        newIndexP, isCorrect,
         correctAnswerselected,
            searchTitle,
            modifyDataQuestion
        };