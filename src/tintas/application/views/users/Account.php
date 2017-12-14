<div class="container">
<?php echo validation_errors(); ?>

    <div class="panel panel-default">
    <div class="panel-heading text-center">Votre compte</div>
    <div class="panel-body">
        <form method="POST" action="<?php echo site_url('users/Account/update'); ?>" class="col-md-6 col-md-offset-3">
            <input type="hidden" name="id" value="<?php echo $id; ?>"/>        
            <div class="form-group">
                <label for="username">Login</label>
                <input class="form-control" type="text" size="20" id="username" name="username" value="<?php echo $login ?>" />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input class="form-control" type="email" size="20" id="email" name="email" value="<?php echo $email ?>" />
            </div>

            <div class="form-group">
                <label for="nom">Nom</label>
                <input class="form-control" type="text" size="20" id="nom" name="nom" value="<?php echo $nom ?>" />
            </div>

            <div class="form-group">
                <label for="prenom">Prénom</label>
                <input class="form-control" type="text" size="20" id="prenom" name="prenom" value="<?php echo $prenom ?>" />
            </div>
    </div>
    <div class="panel-footer text-center">
            <button type="submit" name="update" class="btn btn-warning">Modifier</button>
        </form>
    </div>
</div>
    
    <div class="panel panel-default">
    <div class="panel-heading text-center">Mot de passe</div>
    <div class="panel-body">
        <form method="Post" action="<?php echo site_url('users/Account/updatePassword'); ?>" class="col-md-6 col-md-offset-3">   
        <input type="hidden" name="id" value="<?php echo $id; ?>"/> 
            <div class="form-group" >
                <label for="password">Ancien mot de passe</label>
                <input class="form-control" type="password" size="20" id="password" name="password" />
            </div>
            <div class="form-group">
                <label for="newPassword">Nouveau mot de passe</label>
                <input class="form-control" type="password" size="20" id="newPassword" name="newPassword" />
            </div>
            <div class="form-group">
                <label for="confirm">Confirmation</label>
                <input class="form-control" type="password" size="20" id="confirm" name="confirm" />
            </div>
    </div>
    <div class="panel-footer text-center">
        <button type="submit" name="pass" class="btn btn-warning">Modifier</button>
        </form>
    </div>
</div>