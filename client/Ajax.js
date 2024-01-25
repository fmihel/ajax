/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

export default class Ajax {
    constructor() {
        // eslint-disable-next-line no-underscore-dangle
        this.global = {
            host: './',
            id: 'router',
            method: 'POST',
            mode: 'cors', // no-cors, cors, same-origin
            cache: 'no-cache', // default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, omit
            headers: {
                // 'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, follow, error
            referrerPolicy: 'no-referrer', // no-referrer, client
        };

        // this.host = window.location.href;

        this.events = {
            before: [],
            after: [],
        };
        this.plugins = [];

        this.reponseText = '';
        this.codeError = 0; 
  
    }

    /** регистрируем события  */
    on(event, callback) {
        if (event in this.events) {
            if (this.events[event].indexOf(callback) === -1) {
                this.events[event].push(callback);
            }
        } else {
            throw new Error(`event ${event} no exists in router? use before or after`);
        }
        return this;
    }

    do(event, pack) {
        if (event in this.events) {
            let out = pack;
            this.events[event].map((callback) => {
                out = { ...out, ...callback(pack) };
            });
            return out;
        }
        throw new Error(`event ${event} no exists in router? use before or after`);
    }

    send({ to, data = {}, params = {} }) {
        const self = this;

        self.responseText = '';
        self.codeError = 0;

        const update = { ...self.global, ...params };
        const { host, id, ...prms } = update;
        let pack = { data, to };

        pack = self.do('before', pack);
        pack = self.doPlugins('before',pack);

        return fetch(
            host,
            {
                ...prms,
                body: JSON.stringify({ [id]: pack }),
            },
        )
            .then((response) => {
                return response.text();
            })
            .then(text=>{
                self.responseText = text;
                try{
                    return JSON.parse(text);
                }catch(e){
                    self.codeError = 300;
                    throw new Error(self.codeErrorToStr(self.codeError));
                }
            })
            .then((recvPack) => {
                let recv = { ...recvPack, to };
                recv  = self.doPlugins('after',recv);
                recv = self.do('after', recv);
  
                if (!('res' in recv)) {
                  self.codeError = 301;
                  throw new Error(self.codeErrorToStr(self.codeError));
                }
  
                if (recv.res == 1) {
                    if (!('data' in recv)) {
                        self.codeError = 302;
                        throw new Error(self.codeErrorToStr(self.codeError));
                    }
                    return recv.data;
                }
  
                if (!('msg' in recv)) {
                    self.codeError = 303;
                    throw new Error(self.codeErrorToStr(self.codeError));
                }
                throw new Error(recv.msg);
            });
    }

    addPlugin(plugin){
        this.plugins.push(plugin);
        return plugin;
    }

    doPlugins(ev,pack){
        let plugins = ev === 'after'?this.plugins.reverse():this.plugins;

        plugins.map(plugin=>{
            if (ev === 'before'){
                pack = plugin.before(pack);
            }else if (ev === 'after'){
                pack = plugin.after(pack)
            };
        });

        return pack;
    }
    
    codeErrorToStr(code){

        if (code == 0){
          return 'нет ошибок';
        }
    
        if (code == 300){
          return 'ошибка парсинга данных сервера';
        }
        if (code == 301){
          return 'не найдено свойство res в структуре ответа';
        }
        if (code == 302){
          return 'не найдено свойство data в структуре ответа';
        }
        if (code == 303){
          return 'не найдено свойство msg в структуре ответа';
        }
    
        return `неизвестный код ошибки ${code}`;
    
      }    
}
