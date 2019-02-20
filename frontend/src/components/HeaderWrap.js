import React, { Component } from 'react';
import Header from './../components/Header';

export default function HeaderWrap(WrapComponent){
   
        return ( 
            <div>
                <Header/>
                {WrapComponent()}
            </div>
         )
    
}
 