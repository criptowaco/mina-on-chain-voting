import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React, { useState, useEffect, memo } from 'react';
import NextCors from 'nextjs-cors'; 
import {Datatable} from '../components/datatable'; 
import dummyData from '../dummy'
// import axios from 'axios';
// import fetch from 'node-fetch';

const Home: NextPage = () => {

  const [data, setData] = useState<{}[]>([])  
  const [q, setQ] = useState("") 

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  useEffect(() => {
    fetch("http://35.203.38.140:8080/votes",   
        {
      method: 'POST', 
      headers: requestHeaders,
      mode: 'no-cors',
        }) 
    .then(response => response.json())
    .then(json => setData(json))
    .catch(error => setData(dummyData));
  }) 
/*
  type APIdata = {Account : string, Memo : string, Pending : string}[]
  function transform(rows : string[][]) : APIdata {
      const data : APIdata = rows.map(row => {return({Account: row[0], Memo: row[1], Pending: row[2]})})
      return data;
  }

  function search(rows : any) {
    return rows.filter((row : any) => row.Memo.toLowerCase().indexOf(q) > -1)
  } 
*/
  return (
    <div>
      <main className={styles.main}> 
      <h2> This is how you can vote today ___ </h2>
      
      <h1 className={styles.title}>
          Voting Summary
        </h1>
      <div>
          <Datatable data={data} /> 
      </div>
      </main>
    </div>
  )
}

export default Home