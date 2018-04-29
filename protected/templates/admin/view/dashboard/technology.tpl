{strip}
<div class="technology_block">
    <a href="#" class="button mb5 " onclick="return toggle_item(event, this, 'server-info', ['icon-chevron-up', 'icon-chevron-down'])"><i class="icon icon-chevron-down"></i> <i class="icon icon-info-outline"></i> {t('server.informationen')}</a>

    <div class="technology_list clearfix hidden" id="server-info">
        {if isset($technology.php )}
        <div class="technology_item">
            <div class="technology_version">{$technology.php}</div>
            <div class="technology_logo"><a href="/phpinfo.php" target="_blank"><img src="/{$ADMIN_DIR}/images/technology/php.jpg" width="100" height="75" alt=""></a></div>
        </div>
        {/if}
        
        {if isset($technology.mysql )}
        <div class="technology_item">
            <div class="technology_version">{$technology.mysql}</div>
            <div class="technology_logo"><img src="/{$ADMIN_DIR}/images/technology/mysql.jpg" width="100" height="75" alt=""></div>
        </div>
        {/if}
        
        {if isset($technology.memcache )}
        <div class="technology_item">
            <div class="technology_version">{$technology.memcache}</div>
            <div class="technology_logo"><img src="/{$ADMIN_DIR}/images/technology/memcache.jpg" width="100" height="75" alt=""></div>
        </div>
        {/if}
        
        {if isset($technology.apache )}
        <div class="technology_item">
            <div class="technology_version">{$technology.apache}</div>
            <div class="technology_logo"><img src="/{$ADMIN_DIR}/images/technology/apache.jpg" width="100" height="75" alt=""></div>
        </div>
        {/if}
        
        {if isset($technology.nginx )}
        <div class="technology_item">
            <div class="technology_version">{$technology.nginx}</div>
            <div class="technology_logo"><img src="/{$ADMIN_DIR}/images/technology/nginx.jpg" width="100" height="75" alt=""></div>
        </div>
        {/if}
        
        {if isset($technology.mongodb )}
        <div class="technology_item">
            <div class="technology_version">{$technology.mongodb}</div>
            <div class="technology_logo"><img src="/{$ADMIN_DIR}/images/technology/mongodb.jpg" width="100" height="75" alt=""></div>
        </div>
        {/if}
        
        {if isset($technology.redis )}
        <div class="technology_item">
            <div class="technology_version">{$technology.redis}</div>
            <div class="technology_logo"><img src="/{$ADMIN_DIR}/images/technology/redis.jpg" width="100" height="75" alt=""></div>
        </div>
        {/if}
    </div>
</div>
{/strip}