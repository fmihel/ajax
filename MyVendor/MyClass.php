<?php

namespace MyVendor;

use Composer\Script\Event;

class MyClass
{

    public static function warmCache(Event $event)
    {
        // make cache toasty
        error_log('message from Vendor!!!!');
    }
}
