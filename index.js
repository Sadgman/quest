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
    }while(ListOfQuestResp.slice(-4).includes(index_p));
    
    ListOfQuestResp.push(index_p);
    
    if(ListOfQuestResp.length === 5){
        ListOfQuestResp = [];
    }
    return index_p;
}

function readTitle(){
    return data_question["p"][index_p];
}
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
function isCorrect(resp){
/**
 * @param {string} resp
 * @return {boolean}
 */
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
function correctAnswer(){
    return data_question["r"][index_p]["correct"];
}
module.exports = {readTitle, readResponse, correctAnswer, correctAnswerIndex, newIndexP, isCorrect};