<?php
namespace fmihel\Ajax;

class AjaxPlugin implements iAjaxPlugin
{
    public $router;

    public function setRouter($router)
    {
        $this->router = $router;
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
