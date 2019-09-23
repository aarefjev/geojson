<?php


class Map_test  extends TestCase
{
    public function test_index()
    {
        $output = $this->request('GET', 'map/index');
        $this->assertContains('<title>Welcome to GeoPal TEST | From Arte Arefjev</title>', $output);
    }

}