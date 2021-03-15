<?php
namespace Psalm\Output;

use Psalm\Output;

class JsonSummary extends Output
{
    /**
     * {{@inheritdoc}}
     */
    public function create(): string
    {
        $type_counts = [];

        foreach ($this->issues_data as $issue_data) {
            $type = $issue_data['type'];

            if (!isset($type_counts[$type])) {
                $type_counts[$type] = 0;
            }

            $type_counts[$type]++;
        }

        return json_encode([
            'issue_counts' => $type_counts,
            'mixed_expression_count' => $this->mixed_expression_count,
            'total_expression_count' => $this->total_expression_count
        ]) . "\n";
    }
}
