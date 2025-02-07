<?php
/** @var \App\Model\Film $film */
?>

<div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" name="film[title]" value="<?= $film ? $film->getTitle() : '' ?>">
</div>

<div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" name="film[description]"><?= $film ? $film->getDescription() : '' ?></textarea>
</div>

<div class="form-group">
    <label for="year">Year</label>
    <input type="number" id="year" name="film[year]" value="<?= $film ? $film->getYear() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>