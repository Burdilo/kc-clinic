<?php

class discountModule extends Module
{
    public function index()
    {
        if (isset($this->arguments[1]))
        {
            return $this->errorPage;
        }

        if (isset($this->arguments[0]))
        {
            return $this->itemMethod(intval($this->arguments[0]));
        }

        return $this->blockMethod();
    }

    public function blockMethod()
    {
        $discount = Q("SELECT * FROM `#_mdd_discount` WHERE `visible` = ?i ORDER BY `ord` ASC", array(1))->all();
        if (!empty($discount)){
            $dif = new Files();
            foreach ($discount as $key => $value) {
                $discount[$key]['image_file'] = $dif->getFilesByGroup($value['image'], array('original'), array('file'), true);
            }
        }
        //exit(__debug($discount));
        return array(
            'template' => 'block',
            'discount' => $discount
        );
    }
}