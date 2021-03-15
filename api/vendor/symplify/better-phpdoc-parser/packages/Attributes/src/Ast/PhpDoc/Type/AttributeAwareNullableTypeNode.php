<?php declare(strict_types=1);

namespace Symplify\BetterPhpDocParser\Attributes\Ast\PhpDoc\Type;

use PHPStan\PhpDocParser\Ast\Type\NullableTypeNode;
use Symplify\BetterPhpDocParser\Attributes\Attribute\AttributeTrait;
use Symplify\BetterPhpDocParser\Attributes\Contract\Ast\AttributeAwareNodeInterface;

final class AttributeAwareNullableTypeNode extends NullableTypeNode implements AttributeAwareNodeInterface
{
    use AttributeTrait;

    public function __toString(): string
    {
        return $this->type . '|null';
    }
}
