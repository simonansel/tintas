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
            <td class="col-md-4">
                <div class="alert alert-info text-center" ><?php echo $stats->nbPlayed ?></div>
            </td>
            <td class="col-md-4">
                <div class="alert alert-success text-center" ><?php echo $stats->nbWin?></div>
            </td>
            <td class="col-md-4">
                <div class="alert alert-warning text-center" ><?php echo $stats->nbDraw?></div>
            </td>
        </tr>
        </tbody>
    </table>

</div>

