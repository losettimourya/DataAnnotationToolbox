import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SetupPipeline.css';
import '../css/yourpipeline.css'
import '../css/features.css';
import data from '../data';
import  { useState } from "react";


function Toolbar()
{
    const [pipelineComponents, setPipelineComponents] = useState([]);

    const onAddBtnClick = (event, text) => {
        setPipelineComponents(pipelineComponents.concat(<li>{text} <button id ="bid" onClick={() => {setPipelineComponents(pipelineComponents.slice(0, -1))}} >Remove</button></li>));
    };
    var iter = 1;
    return(
        
        <div>
            <div id="toolbar" class="our-services section">
                <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3">
                    <div class="section-heading wow bounceIn" data-wow-duration="1s" data-wow-delay="0.2s">
                        <h2>CV <span>Toolbar</span></h2>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div id="features" class="features section">
              <div class="container">
                 <div class="row">
                 <div className="row justify-content-center">
                    {data.componentData.map((item, index) => {
                        return(

                            <div class="col-lg-3">
                             <div class="features-item first-feature wow fadeInUp" data-wow-duration="1s" data-wow-delay="0s" value = "tsts" onClick={event => onAddBtnClick(event, item.title)}>
                             <div class="first-number number">
                                <h6>{iter++}</h6>
                               </div>
                               <div class="icon"></div>
                               <h4>{item.title}</h4>
                               <div class="line-dec"></div>
                               <p>{item.desc}</p>
                             </div>
                          </div>
                        )
                    })}

                 </div>
                 <div class="col-lg-12">
                        <div class="main-green-button scroll-to-section View-Pipeline">
                            <a href="#yourpipeline">View Pipeline</a>
                        </div>
                </div> 
                 </div>
                </div>
            </div> 
            <div id="yourpipeline" class="about-us section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="left-image wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.5s">
            
          </div>
        </div>
        <div class="col-lg-6 align-self-center wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
          <div class="section-heading">
            <h2>Your <span>Pipeline</span></h2>
            <div>
                <ul id="comp-list">
                {pipelineComponents}</ul></div>
            
          </div>
          <div id="list-text">
            Please Select CV Tools
          </div>
          <ul id="comp-list">
          </ul>
          
          <div href="/viewResult" class="main-green-button"><a onclick="sendPipeline()">View Intermediate Results</a></div>
        </div>
      </div>
    </div>
  </div> 
           
        </div>
    );
}


export default Toolbar;