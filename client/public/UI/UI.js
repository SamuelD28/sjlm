import React, {Component} from 'react';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './UI.module.css';

class UI extends Component{
    
    render(){
        return(
        <div styleName="body">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/components/input.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/components/checkbox.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/components/form.css" />
            </head>
            <div>
                <h3>Text and typography</h3>
                <div>
                    <h1>H1 header</h1>
                    <h2>H2 header</h2>
                    <h3>H3 header</h3>
                    <h4>H4 header</h4>
                    <h5>H5 header</h5>
                    <h6>H6 header</h6>
                </div>
                <div>
                    <p styleName="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum quam ac ornare tristique. Duis tincidunt lacus est. Praesent vitae nibh efficitur felis sodales posuere. Integer venenatis quis mi eu porta. Nulla tempor pellentesque condimentum. Nunc vitae bibendum ipsum, nec commodo dolor. Donec ac porta urna, in sagittis risus.</p>
                </div>
                <div>
                    <span styleName="text-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</span> <br />
                    <span styleName="text-muted">Nullam id dolor id nibh ultricies vehicula ut id elit.</span> <br />
                    <span styleName="text-danger">Nullam id dolor id nibh ultricies vehicula ut id elit.</span> <br />
                    <span styleName="text-warning">Nullam id dolor id nibh ultricies vehicula ut id elit.</span> <br />
                </div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <h6>Form Inputs</h6>
                  </div>
                  <div styleName="section-row">
                    <div>
                      <div className="ui form">
                          <div className="grouped fields">
                            <label>How often do you use checkboxes?</label>
                            <div className="field">
                              <div className="ui radio checkbox">
                                <input type="radio" name="example2" checked="checked" />
                                <label>Once a week</label>
                              </div>
                            </div>
                            <div className="field">
                              <div className="ui radio checkbox">
                                <input type="radio" name="example2" />
                                <label>2-3 times a week</label>
                              </div>
                            </div>
                            <div className="field">
                              <div className="ui radio checkbox">
                                <input type="radio" name="example2" />
                                <label>Once a day</label>
                              </div>
                            </div>
                            <div className="field">
                              <div className="ui radio checkbox">
                                <input type="radio" name="example2" />
                                <label>Twice a day</label>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div styleName="section-row">
                        <div className="ui form">
                           <div className="ui checkbox">
                              <input type="checkbox" name="example" />
                              <label>Make my profile visible</label>
                            </div>
                            <div className="ui slider checkbox" >
                              <input type="checkbox" name="newsletter" />
                              <label>Accept terms and conditions</label>
                            </div>
                            <div className="ui toggle checkbox">
                              <input type="checkbox" name="public" />
                              <label>Subscribe to weekly newsletter</label>
                            </div>
                        </div>
                    </div>
                  </div>
                  <strong>Buttons</strong>
                  <div>
                    <div>
                      <button styleName="btn btn-primary">Primary</button>
                      <button styleName="btn btn-secondary">Secondary</button>
                      <button styleName="btn btn-success">Success</button>
                      <button styleName="btn btn-danger">Danger</button>
                      <button styleName="btn btn-warning">Warning</button>
                      <button styleName="btn btn-info">Info</button>
                    </div>
                  </div>
                  <strong>Outline Buttons</strong>
                  <div>
                    <div>
                      <button styleName="btn btn-outline-primary">Primary</button>
                      <button styleName="btn btn-outline-secondary">Secondary</button>
                      <button styleName="btn btn-outline-success">Success</button>
                      <button styleName="btn btn-outline-danger">Danger</button>
                      <button styleName="btn btn-outline-warning">Warning</button>
                      <button styleName="btn btn-outline-info">Info</button>
                    </div>
                  <div>
                  <strong>Button Size</strong>
                    <div>
                      <button styleName="btn btn-sm">Small</button>
                      <button styleName="btn">Default</button>
                      <button styleName="btn btn-md">Medium</button>
                      <button styleName="btn btn-lg">Large</button>
                    </div>
                  </div>
                      <div>
                        <div>
                          <strong>Forms</strong>
                          <form>
                            <div>
                                <div className="ui input">
                                    <input type="text" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/> 
                                </div>
                            </div>
                            <div className="ui input">
                              <input type="password" id="inputPassword4" placeholder="Password" value="myCoolPassword"/> 
                            </div>
                            <div className="ui input">
                                <input type="text" id="inputAddress" placeholder="1234 Main St" value="7898 Kensington Junction, New York, USA"/> 
                            </div>
                            <div className="ui input">
                                <input type="text" id="inputCity" value="New York"/>
                            </div>
                            <select className="ui dropdown">
                              <option value="">Gender</option>
                              <option value="1">Male</option>
                              <option value="0">Female</option>
                            </select>
                          </form>
                        </div>
                        <div>
                          <strong>Form Validation</strong>
                          <form className="ui form">
                              <h4 className="ui dividing header">Shipping Information</h4>
                              <div className="field">
                                <label>Name</label>
                                <div className="fields">
                                  <div className="field">
                                    <input type="text" name="shipping[first-name]" placeholder="First Name"/>
                                  </div>
                                  <div className="field">
                                    <input type="text" name="shipping[last-name]" placeholder="Last Name"/>
                                  </div>
                                </div>
                              </div>
                              <div className="field">
                                <label>Billing Address</label>
                                <div className="fields">
                                  <div className="field">
                                    <input type="text" name="shipping[address]" placeholder="Street Address"/>
                                  </div>
                                  <div className="field">
                                    <input type="text" name="shipping[address-2]" placeholder="Apt #"/>
                                  </div>
                                </div>
                              </div>
                            </form>
                        </div>
                        <div>
                            <h3>Image Component</h3>
                        </div>
                        <div>
                            <h3>Javascript Component</h3>
                            <div>
                                <button>Modal</button>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
    
} 

export default CSSModules(UI, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});