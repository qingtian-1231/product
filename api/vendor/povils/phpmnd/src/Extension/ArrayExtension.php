<?php

namespace Povils\PHPMND\Extension;

use PhpParser\Node;
use PhpParser\Node\Expr\ArrayItem;
use PhpParser\Node\Scalar\String_;

class ArrayExtension extends Extension
{
    /**
     * @inheritdoc
     */
    public function getName()
    {
        return 'array';
    }

    /**
     * @inheritdoc
     */
    public function extend(Node $node)
    {
        $parent = $node->getAttribute('parent');

        return $parent instanceof ArrayItem && false === $this->ignoreArray($parent);
    }

    /**
     * @inheritdoc
     */
    private function ignoreArray(ArrayItem $node)
    {
        $arrayKey = $node->key;
        
        return $this->option->allowArrayMapping() &&
        $arrayKey instanceof String_ &&
        false === ($this->option->includeNumericStrings() && is_numeric($arrayKey->value));
    }
}
