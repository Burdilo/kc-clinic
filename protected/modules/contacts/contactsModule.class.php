<?php

class contactsModule extends Module
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
    	$contacts = Q("SELECT * FROM `#_mdd_contacts` WHERE `visible` = ?i", array(1))->row();
        return array(
            'template' => 'block',
            'contacts' => $contacts
        );
    }
}