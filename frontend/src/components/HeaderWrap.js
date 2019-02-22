import React, { Component } from 'react';
import Header from './../components/Header';

export default function HeaderWrap(WrapComponent,cur){
   
        return ( 
            <div>
                <Header current={cur}/>
                {WrapComponent()}
            </div>
         )
    
}
 