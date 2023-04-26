# ajax v1.0

## Install 

```bash
$ npm i fmihel-ajax
$ composer require fmihel/ajax 
```
run script for remove js files from vendor path 
```bash
$ cd ./vendor/fmihel/ajax && ./composer-after-install.sh && cd ../../../

```

## Simple use
file struct
```
path
  |-path1
  |   |-path2
  |       |-mod.php
  |-index.php
  |-client.js
```

```client.js```
```js 
import ajax from 'fmihel-ajax';

ajax::send({
    to:'path1/path2/mod',
    data:{ msg: 'send msg to server',any_num:10,arr:[1,32,4,2]},
})
.then(data=>{
    console.info(data);
})
.catch(e=>{
    console.error(e);
});

```

```mod.php``` in folder ```<path-of-index.php>/path1/path2```
```php
<?php
    use fmihel\ajax\ajax;
    error_log(print_r(ajax::$data,true));
    ajax::out('hi, from server');
?>
```



```index.php```
```php
<?php

require_once __DIR__.'/vendor/autoload.php';

use fmihel\ajax\ajax;

if (ajax::enabled()){
    ajax::init();
    require_once ajax::module();
    ajax::done();
};

?>
```
