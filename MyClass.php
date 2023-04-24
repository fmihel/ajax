<?php

namespace MyVendor;

use Composer\Installer\PackageEvent;
use Composer\Script\Event;

class MyClass
{
    public static function postUpdate(Event $event)
    {
        $composer = $event->getComposer();
        error_log('postUpdate...');
        // do stuff
    }

    public static function postAutoloadDump(Event $event)
    {
        $vendorDir = $event->getComposer()->getConfig()->get('vendor-dir');
        require $vendorDir . '/autoload.php';
        error_log('postAutoloadDump...');

    }

    public static function postPackageInstall(PackageEvent $event)
    {
        $installedPackage = $event->getOperation()->getPackage();
        // do stuff
        error_log('postPackageInstall...');
    }

    public static function warmCache(Event $event)
    {
        // make cache toasty
        error_log('warmCache...');
    }
}
