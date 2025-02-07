<?php

/** @var \App\Model\Film[] $films */
/** @var \App\Service\Router $router */

$title = 'Film List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Film List</h1>

    <a href="<?= $router->generatePath('film-create') ?>">Add New Film</a>

    <ul class="index-list">
        <?php foreach ($films as $film): ?>
            <li><h3><?= $film['title'] ?> (<?= $film['year'] ?>)</h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('film-show', ['id' => $film['id']]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('film-edit', ['id' => $film['id']]) ?>">Edit</a></li>
                    <li><a href="<?= $router->generatePath('film-delete', ['id' => $film['id']]) ?>">Delete</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';