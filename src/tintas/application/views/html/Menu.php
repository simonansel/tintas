<div class="col-md-2">
	<div class="list-group">
	<h3 class="list-group-item list-group-item-info"> Categories</h3>
		<?php
	  		$i = 0;
			foreach($categories as $cat):
		?>
	  <a href="<?php echo site_url('product/productList/index/'.$cat->id);?>" class="list-group-item <?php if($this->uri->segment('4') == $cat->id) echo 'active'; ?>">
	    <?php echo $cat->nom ; ?>
	  </a>
	  	<?php endforeach;?>
	</div>
</div>