<div class="container">

    <div class="col-md-6 col-md-offset-3">
        <?php echo validation_errors(); ?>
    </div>

    <?php echo form_open('users/register/save'); ?>
    <fieldset class="col-md-6 col-md-offset-3">
        <legend>Inscription</legend>
        <div>
            <div class="form-group">
                <label for="username">Login</label>
                <input class="form-control" type="text" size="20" id="login" name="login"/>
            </div>

            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input class="form-control" type="password" size="20" id="pass" name="pass"/>
            </div>

            <div class="form-group">
                <label for="password">Email</label>
                <input class="form-control" type="email" size="20" id="email" name="email"/>
            </div>

            <div class="form-group">
                <label for="password">Nom</label>
                <input class="form-control" type="text" size="20" id="nom" name="nom"/>
            </div>

            <div class="form-group">
                <label for="password">Prénom</label>
                <input class="form-control" type="text" size="20" id="prenom" name="prenom"/>
            </div>

            <div class="form-group">
                <input class="btn btn-primary" type="submit" value="Inscription"/>
            </div>
        </div>
    </fieldset>
    </form>
</div>

