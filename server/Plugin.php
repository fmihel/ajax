<?php
namespace fmihel\ajax;

class Plugin implements iPlugin
{
    public $ajax;

    public function setAjax($ajax)
    {
        $this->ajax = $ajax;
    }

    // должен возвращат $pack
    public function before($pack)
    {
        return $pack;
    }

    // должен возвращат $pack
    public function after($pack)
    {
        return $pack;
    }

}
