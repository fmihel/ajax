export default class Ajax{
    
    /** set new global params 
     * @return {object} params
    */
    params(a?:object):object;
    
    /** add callback event for before or after handler on send*/
    on(event:string, callback:object):object;

    /** send request to server 
     * @return {Promise}
    */
    send({to:string, data:any}):object;
    
    /** add plugin 
     * @return {object} plugin
    */
    addPlugin(plugin:object):object;
}