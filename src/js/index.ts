import axios, {
    AxiosResponse,
    AxiosError,
} from "../../node_modules/axios/index";

import { json2table100 } from "./generictable";


interface ISample{
    Id : number;
    Name:string;
    Age:number;
    DateTime:string;
}
let buttonElement: HTMLButtonElement=<HTMLButtonElement>document.getElementById("getAll");
buttonElement.addEventListener("click",Showtable);
function Showtable():void{
    let uri: string = "https://webapplication20181226114109.azurewebsites.net/api/samples";
    axios.get<ISample[]>(uri)
 .then(function (response: AxiosResponse<ISample[]>): void {
     let data: ISample[] = response.data;
    console.log(data);
    let result: string = json2table100(response.data);
    console.log(result);
    let getElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
    getElement.innerHTML = result;
})
.catch(function (error: AxiosError): void {
    console.log(JSON.stringify(error));
})};

let Addbutton:HTMLButtonElement=<HTMLButtonElement>document.getElementById("add");
Addbutton.addEventListener("click",AddData);

function AddData():void{
    let addIdElement:HTMLInputElement=<HTMLInputElement>document.getElementById("addId");
    let addNameElement:HTMLInputElement=<HTMLInputElement>document.getElementById("addName");
    let addAgeElement:HTMLInputElement=<HTMLInputElement>document.getElementById("addAge");
    let addDTElement:HTMLInputElement=<HTMLInputElement>document.getElementById("addDT");
    let myId:number=Number(addIdElement.value);
    let myName:string= addNameElement.value;
    let myAge:number=Number(addAgeElement.value);
    let myDT:string=addDTElement.value;
    let uri: string = "https://webapplication20181226114109.azurewebsites.net/api/samples";
    axios.post<ISample>(uri, { Id: myId, Name: myName, Age: myAge,DateTime:myDT })
        .then((response: AxiosResponse) => { console.log("response " + response.status + " " + response.statusText); })
        .catch((error: AxiosError) => { console.log(error); });
}

let deletebutton:HTMLButtonElement=<HTMLButtonElement>document.getElementById("deleteButton");
deletebutton.addEventListener("click",DeleteData);
function DeleteData():void{
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
    let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
    let Id: number = Number(inputElement.value);
    let uri: string = "https://webapplication20181226114109.azurewebsites.net/api/samples/" + Id;
    axios.delete<ISample>(uri)
        .then(function (response: AxiosResponse<ISample>): void {
            // element.innerHTML = generateSuccessHTMLOutput(response);
            // outputHtmlElement.innerHTML = generateHtmlTable(response.data);
            console.log(JSON.stringify(response));
            output.innerHTML = response.status + " " + response.statusText;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                output.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                output.innerHTML = error.message;
            }
        });
}
let ByIdElement:HTMLButtonElement=<HTMLButtonElement>document.getElementById("getById");
 ByIdElement.addEventListener("click",getbyid);
  function getbyid():void{
    let inputIdElement: HTMLInputElement=<HTMLInputElement>document.getElementById("inputId");
    // let outputResultElement:HTMLDivElement=<HTMLDivElement>document.getElementById("outputResult");
    let Id:number=Number(inputIdElement.value);
    let uri: string = "https://webapplication20181226114109.azurewebsites.net/api/samples/" + Id;
    axios.get<ISample[]>(uri)
    .then(function (response: AxiosResponse<ISample[]>): void {
        let data: ISample[] = response.data;
       console.log(data);
       let result: string = json2table100(response.data);
       console.log(result);
    let outputResultElement: HTMLDivElement = <HTMLDivElement>document.getElementById("outputResult");
       outputResultElement.innerHTML = result;
   })
   .catch(function (error: AxiosError): void {
       console.log(JSON.stringify(error));
   })};
  