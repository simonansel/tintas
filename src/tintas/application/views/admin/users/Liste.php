<div class="container">
    <fieldset>
        <legend>Administration - Liste des utilisateurs</legend>
    </fieldset>
    <form>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>
                        Login
                    </th>
                    <th>
                        Firstname
                    </th>
                    <th>
                        Lastname
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Password
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
            </thead>
                <tbody>
                <?php foreach($users as $row): ?>

                    <?php $rowAsArray = (array) $row; ?>
                    <form method="POST" action="<?php echo site_url('admin/users/Liste/update'); ?>">
                    <tr>
                        <input type="hidden" name="id" value="<?php echo $row->id ?>">
                        <td>
                            <div class="input-group">
                                <input class="form-control" type="text" name="username" value="<?php echo $row->login ?>">
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input class="form-control" type="text" name="prenom" value="<?php echo $row->prenom ?>">
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input class="form-control" type="text" name="nom" value="<?php echo $row->nom ?>">
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input class="form-control" type="text" name="email" value="<?php echo $row->email ?>">
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input class="form-control" type="password" name="password" value="******">
                            </div>
                        </td>
                        <td>
                            <button type="submit" name="update" class="btn btn-default btn-warning">
                                <span class="glyphicon glyphicon-pencil"></span>
                            </button>
                        </td>
                    </tr>
                    </form>
                <?php endforeach; ?>
                </tbody>
            
        </table>
    </form>
</div>

