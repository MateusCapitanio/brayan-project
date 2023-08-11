'use client'
import axios from "axios";
import { useState } from "react"
import { NumericFormat } from "react-number-format";

export default function Form() {
  const [showSignInput, setShowSignInput] = useState(false);
  const [buttonAbble, setButtonAbble] = useState(true);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [totalValue, setTotalValue] = useState(0);



  const submitForm = async (date, description, name, totalValue) => {
    const body = JSON.stringify( {
      "data_pedido" : date,
      "data_entregue" : null,
      "cliente" : name,
      "descricao" : description,
      "telefone" : "",
      "valor" : totalValue,
      "sinal" : false,
      "valor_sinal" : "",
      "forma_pagamento" : "PIX",
      "status" : "EM ANDAMENTO"
  })
    const response = await axios.post('http://127.0.0.1:5001/vendas', body).then(resp => console.log('RESPONSE API: ', resp))
  }


  return (
    <form className="flex border-2 border-red-500 max-w-lg p-2 items-center flex-col">
      <h1 className="">Projeto Brayan Robert</h1>
      <div className="w-full">
        <p>Data:</p>
        <input onChange={(e) => setDate(e.target.value)} className="w-full rounded p-2 border-2 border-slate-300" type='date' />
      </div>
      <div className="w-full">
        <p>Nome:</p>
        <input onChange={(e) => setName(e.target.value)} className="w-full rounded p-2 border-2 border-slate-300" type='text' />
      </div>
      <div className="w-full">
        <p>Telefone:</p>
        <input onChange={(e) => setNumber(e.target.value)} placeholder="(99) 9 9999-9999" className="w-full rounded p-2 border-2 border-slate-300" type='text' />
      </div>
      <div className="w-full">
        <p>Descrição:</p>
        <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" className="w-full rounded p-2 resize-none border-2 border-slate-300" type='text' />
      </div>
      <div className="w-full">
        <p>Valor total:</p>
        <label htmlFor="totalValue  bg-green-500">
          <span>R$</span>
          <NumericFormat 
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator="."
            onChange={(e) => setTotalValue(e.target.value)}
          />
          {/* <input onChange={(e) => setTotalValue(e.target.value)} type="number" className="border-2 border-slate-300" id="totalValue"></input> */}
        </label>
      </div>
      <button className="self-start bg-blue-500 p-2 m-2 rounded border-2 border-slate-300" onClick={(e) => {
        e.preventDefault()
        setShowSignInput(!showSignInput)
      }}>Sinal</button>
      {showSignInput && (
        <div className="w-full">
        <p>Valor Sinal:</p>
        <label htmlFor="totalValue  bg-green-500">
          <span>R$</span>
          <input className=" border-2 border-2 border-slate-300 " id="totalValue"></input>
        </label>
      </div>
      )}

      <button disabled={name === '' || date === '' || description === '' || totalValue == 0} type="submit" className=" bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed p-2 m-2 rounded" onClick={(e) => {
        e.preventDefault();
        submitForm(date, description, name, totalValue)
        alert(`Venda registrada com sucessso!`)
      }}>Registrar venda</button>
    
    </form>
  )
}