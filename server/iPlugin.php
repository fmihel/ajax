<?php

namespace fmihel\ajax;

interface iPlugin
{
    public function setAjax($ajax);
    // должен возвращат $pack
    public function before($pack);
    // должен возвращат $pack
    public function after($pack);

};
