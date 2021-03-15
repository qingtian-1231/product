<?php

namespace Povils\PHPMND\Extension;

use PhpParser\Node;
use PhpParser\Node\Expr\Assign;

class AssignExtension extends Extension
{
    /**
     * @inheritdoc
     */
    public function getName()
    {
        return 'assign';
    }

    /**
     * @inheritdoc
     */
    public function extend(Node $node)
    {
        return $node->getAttribute('parent') instanceof Assign;
    }
}
