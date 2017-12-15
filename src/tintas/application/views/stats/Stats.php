<div class="container">
    <fieldset>
        <legend>Mes statistiques</legend>
    </fieldset>

        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th>
                    Parties jouées
                </th>
                <th>
                    Parties gagnées
                </th>
                <th>
                    Egalités
                </th>
            </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>
                            <div class="input-group">
                                <input class="form-control" type="text" name="nbPlayed" value="<?php echo $stats->nbPlayed ?>" disabled>
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input class="form-control" type="text" name="nbWin" value="<?php echo $stats->nbWin ?>" disabled>
                            </div>
                        </td>
                        <td>
                            <div class="input-group">
                                <input class="form-control" type="text" name="nbDraw" value="<?php echo $stats->nbDraw ?>" disabled>
                            </div>
                        </td>
                    </tr>
            </tbody>
        </table>

</div>

