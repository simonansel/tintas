<div class="container">

    <div class="col-md-6 col-md-offset-3">
        <?php echo validation_errors(); ?>
    </div>

    <?php echo form_open('users/login/verify'); ?>
    <fieldset class="col-md-6 col-md-offset-3">
        <legend>Connexion à votre compte</legend>
        <div>
            <div class="form-group">
                <label for="username">Login</label>
                <input class="form-control" type="text" size="20" id="username" name="username"/>
            </div>

            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input class="form-control" type="password" size="20" id="password" name="password"/>
            </div>

            <div class="form-group">
                <input class="btn btn-primary" type="submit" value="Login"/>
            </div>
        </div>
    </fieldset>
    </form>

    <fieldset class="col-md-6 col-md-offset-3">
        <legend>Nouveau ? Inscrivez-vous !</legend>
        <div class="form-group">
            <a href="<?php echo site_url('users/register'); ?>" class="btn btn-success">S'inscrire</a>
        </div>
    </fieldset>
</div>

